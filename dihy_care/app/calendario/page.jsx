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
  const [userId, setUserId] = useState(null); // ✅ Guardar userId

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getUserIdAndFetchEvents();
    }
  }, [mounted]);

  // ============================================
  // ✅ Obtener userId primero
  // ============================================
  const getUserIdAndFetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      // Decodificar token para obtener userId
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

      // Si no pudimos decodificar, obtener del endpoint
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
        console.log('Events from backend:', data);
  
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

  // ============================================
  // ✅ Ahora sí enviar userId al crear evento
  // ============================================
 const addEvent = async (newEvent) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    if (!userId) {
      setError('Usuario no identificado');
      return;
    }

    console.log('Evento recibido:', newEvent);

    // ============================================
    // ✅ Mapear el tipo a los valores válidos del enum
    // ============================================
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

    // Obtener el tipo, normalizarlo y mapearlo
    let eventType = newEvent.type || 'OTHER';
    eventType = eventType.toLowerCase().trim();
    eventType = typeMapping[eventType] || 'OTHER';

    console.log('Tipo mapeado:', eventType);

    const eventData = {
      event: newEvent.title,
      description: newEvent.description || '',
      date: newEvent.date,
      type: eventType,  // ✅ Usar el tipo mapeado
      userId: userId,
    };

    console.log('Enviando al backend:', eventData);

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
      console.error('Error del backend:', errorData);
      throw new Error(errorData.error || "Error saving event");
    }

    const savedEvent = await res.json();
    console.log('Evento guardado:', savedEvent);

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
    console.error("Error adding event:", err);
    setError('Error al guardar el evento');
    throw err;
  }
}; 
  const updateEvent = async (eventId, updatedData) => {
    try {
      const token = localStorage.getItem('token');

      const eventData = {
        event: updatedData.title,
        description: updatedData.description,
        date: updatedData.date,
        type: updatedData.type,
        userId: userId, // ✅ Incluir también aquí
      };

      const res = await fetch(`${BACKEND_URL}/calendar/${eventId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!res.ok) throw new Error("Error updating event");

      setEvents((prev) =>
        prev.map((ev) => 
          ev.id === eventId 
            ? { ...ev, ...updatedData, date: new Date(updatedData.date) } 
            : ev
        )
      );

    } catch (err) {
      console.error("Error updating event:", err);
      setError('Error al actualizar el evento');
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${BACKEND_URL}/calendar/${eventId}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Error deleting event");

      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));

    } catch (err) {
      console.error("Error deleting event:", err);
      setError('Error al eliminar el evento');
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
        {error && (
          <div className="bg-red-500 text-white p-4 rounded">
            {error}
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