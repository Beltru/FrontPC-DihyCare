"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventCalendar from "../components/Calendario";

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

const Calendario = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null); // Para mostrar info de debug

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getUserIdAndFetchEvents();
    }
  }, [mounted]);

  const normalizeEventType = (type) => {
    const typeMapping = {
      'reunión': 'OTHER',
      'reunion': 'OTHER',
      'consulta': 'OTHER',
      'cita': 'OTHER',
      'diabetes': 'DIABETES',
      'hipertensión': 'HYPERTENSION',
      'hipertension': 'HYPERTENSION',
      'ejercicio': 'EXERCISE',
      'medicación': 'MEDICATION',
      'medicacion': 'MEDICATION',
      'otro': 'OTHER',
    };

    if (!type) return 'OTHER';
    const normalized = type.toString().toLowerCase().trim();
    return typeMapping[normalized] || type.toUpperCase();
  };

  const getUserIdAndFetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentUserId = payload.userId || payload.id || payload.sub;
        
        if (currentUserId) {
          setUserId(currentUserId);
          await fetchEvents(token);
          return;
        }
      }

      const loginEmail = localStorage.getItem('loginEmail');
      const userResponse = await fetch(`${BACKEND_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (userResponse.ok) {
        const users = await userResponse.json();
        const user = loginEmail 
          ? users.find(u => u.email === loginEmail)
          : users[0];
        
        if (user) {
          setUserId(user.id);
          await fetchEvents(token);
        }
      }
    } catch (err) {
      console.error('Error getting user:', err);
      setError('Error al cargar usuario');
      setLoading(false);
    }
  };

  const fetchEvents = async (token) => {
    try {
      const res = await fetch(`${BACKEND_URL}/calendar`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        console.log('📊 Events from backend:', data);
  
        const formatted = data.map((ev) => ({
          id: ev.id,
          date: new Date(ev.date),
          title: ev.event,
          description: ev.description,
          type: ev.type,
          userId: ev.userId,
        }));
  
        setEvents(formatted);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        throw new Error("Error fetching events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      if (!userId) {
        setError('Usuario no identificado');
        throw new Error('Usuario no identificado');
      }

      console.log('➕ Creando evento:', newEvent);

      const eventData = {
        event: newEvent.title,
        description: newEvent.description || '',
        date: newEvent.date,
        type: normalizeEventType(newEvent.type),
        userId: userId,
      };

      console.log('📤 Enviando al backend:', eventData);

      const res = await fetch(`${BACKEND_URL}/calendar`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Error del backend:', errorData);
        throw new Error(errorData.error || errorData.message || "Error saving event");
      }

      const savedEvent = await res.json();
      console.log('✅ Evento guardado con ID:', savedEvent.id);

      // Actualizar el estado con el evento que tiene ID del backend
      setEvents((prev) => [
        ...prev,
        {
          id: savedEvent.id,
          date: new Date(savedEvent.date),
          title: savedEvent.event,
          description: savedEvent.description,
          type: savedEvent.type,
          userId: savedEvent.userId,
        }
      ]);

      setError('');
      return savedEvent;

    } catch (err) {
      console.error("❌ Error adding event:", err);
      setError(`Error al guardar el evento: ${err.message}`);
      throw err;
    }
  }; 

  const updateEvent = async (eventId, updatedData) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      if (!eventId) {
        throw new Error('ID de evento inválido');
      }

      console.log('✏️ Actualizando evento:', eventId, updatedData);

      const eventData = {
        event: updatedData.title,
        description: updatedData.description || '',
        date: updatedData.date,
        type: normalizeEventType(updatedData.type),
        userId: userId,
      };

      console.log('📤 Enviando actualización:', eventData);

      const res = await fetch(`${BACKEND_URL}/calendar/${eventId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Error al actualizar:', errorData);
        throw new Error(errorData.error || errorData.message || "Error updating event");
      }

      const updatedEvent = await res.json();
      console.log('✅ Evento actualizado:', updatedEvent);

      setEvents((prev) =>
        prev.map((ev) => 
          ev.id === eventId 
            ? { 
                ...ev, 
                title: updatedData.title,
                description: updatedData.description,
                date: new Date(updatedData.date),
                type: eventData.type
              } 
            : ev
        )
      );

      setError('');

    } catch (err) {
      console.error("❌ Error updating event:", err);
      setError(`Error al actualizar el evento: ${err.message}`);
      throw err;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      // ✅ VALIDACIÓN: Verificar que el ID es válido
      if (!eventId || eventId === undefined || eventId === null) {
        console.error('❌ ID de evento inválido:', eventId);
        throw new Error('ID de evento inválido');
      }

      // Convertir a número si es string
      const numericId = typeof eventId === 'string' ? parseInt(eventId, 10) : eventId;
      
      if (isNaN(numericId)) {
        console.error('❌ ID no es un número válido:', eventId);
        throw new Error('ID no es un número válido');
      }

      // ✅ Verificar que el evento existe en el estado
      const eventToDelete = events.find(e => e.id === numericId);
      if (!eventToDelete) {
        console.error('❌ Evento no encontrado en el estado:', numericId);
        console.log('📊 Eventos actuales:', events.map(e => ({ id: e.id, title: e.title })));
        throw new Error('Evento no encontrado en el estado local');
      }

      console.log('🗑️ Eliminando evento:', {
        id: numericId,
        tipo: typeof numericId,
        titulo: eventToDelete.title,
        userId: eventToDelete.userId
      });

      const url = `${BACKEND_URL}/calendar/${numericId}`;
      console.log('📤 URL de DELETE:', url);

      const res = await fetch(url, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log('📥 Respuesta del DELETE:', {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { 
            error: `Error ${res.status}: ${res.statusText}`,
            message: 'No se pudo parsear la respuesta del servidor'
          };
        }
        
        console.error('❌ Error del backend:', errorData);
        
        // Mostrar info de debug
        setDebugInfo({
          eventId: numericId,
          response: res.status,
          error: errorData,
          localEvent: eventToDelete
        });
        
        throw new Error(
          errorData.message || 
          errorData.error || 
          `Error ${res.status} al eliminar evento`
        );
      }

      // ✅ Solo actualizar el estado si el backend confirmó la eliminación
      setEvents((prev) => prev.filter((ev) => ev.id !== numericId));
      console.log('✅ Evento eliminado exitosamente del estado');
      
      setError('');
      setDebugInfo(null);

    } catch (err) {
      console.error("❌ Error deleting event:", err);
      const errorMessage = `Error al eliminar el evento: ${err.message}`;
      setError(errorMessage);
      
      // Log adicional para debugging
      console.log('📊 Estado actual de eventos:', events);
      console.log('🔍 Evento que se intentó eliminar:', eventId);
      
      throw err;
    }
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <main className="flex w-full h-screen items-center justify-center bg-[#AACBC4]">
        <p className="text-white text-xl">Cargando calendario...</p>
      </main>
    );
  }

  return (
    <main className="flex w-full h-screen overflow-x-auto bg-[#AACBC4] text-white">
      <div className="flex flex-col gap-6 p-6 w-full">
        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-bold">⚠️ Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
              <button 
                onClick={() => {
                  setError('');
                  setDebugInfo(null);
                }}
                className="ml-4 underline hover:no-underline text-sm"
              >
                Cerrar
              </button>
            </div>
            
            {/* Debug info */}
            {debugInfo && (
              <details className="mt-2 bg-red-600 p-2 rounded text-xs">
                <summary className="cursor-pointer font-semibold">
                  Ver información técnica
                </summary>
                <pre className="mt-2 overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Debug panel - solo en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-800 text-white p-3 rounded text-xs">
            <p><strong>Debug Info:</strong></p>
            <p>• User ID: {userId}</p>
            <p>• Total eventos: {events.length}</p>
            <p>• IDs de eventos: {events.map(e => e.id).join(', ')}</p>
          </div>
        )}

        <EventCalendar
          events={events}
          onAddEvent={addEvent}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
        />
      </div>
    </main>
  );
};

export default Calendario;