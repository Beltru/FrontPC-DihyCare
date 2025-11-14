'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  User,
  Shield,
  Save,
  ChevronRight,
} from 'lucide-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@nextui-org/react";

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

export default function SettingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState(null);

  const [settings, setSettings] = useState({
    name: '',
    surname: '',
    email: '',
    age: '',
    sex: '',      // MALE o FEMALE (según tu Prisma enum)
    weight: '',
    height: '',

    // Preferencias (se guardan en Data con dataType: user_settings)
    notifMediciones: true,
    notifMedicamentos: true,
    notifCitas: true,
    notifAlertas: true,
    compartirDatos: false,
    backupAutomatico: true,
  });

  const [activeTab, setActiveTab] = useState('perfil');
  const [selectedKeys, setSelectedKeys] = useState({
    sex: new Set([]),
  });

  const getSelectedValue = (field) => {
    const value = selectedKeys[field];
    if (!value || value.size === 0) return "Seleccionar sexo";
    return Array.from(value).join(", ").replace(/_/g, " ");
  };

  const handleSelect = (field, keys) => {
    const selected = Array.from(keys)[0];
    setSettings((prev) => ({ ...prev, [field]: selected }));
  };

  // ============================================
  // Cargar datos del usuario
  // ============================================
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // ============================================
    // Opción 1: Decodificar el token JWT para obtener el ID del usuario
    // ============================================
    // El token JWT contiene información del usuario codificada
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('Token payload:', payload);
      
      // El payload debería contener el userId o id
      // Ajusta según lo que tu backend ponga en el token
      const currentUserId = payload.userId || payload.id || payload.sub;
      
      if (currentUserId) {
        // Obtener el usuario específico por ID
        const userResponse = await fetch(`${BACKEND_URL}/user/${currentUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserId(user.id);
          
          setSettings((prev) => ({
            ...prev,
            name: user.name || '',
            surname: user.surname || '',
            email: user.email || '',
            age: user.age || '',
            sex: user.sex || '',
            weight: user.weight || '',
            height: user.height || '',
          }));

          if (user.sex) {
            setSelectedKeys({ sex: new Set([user.sex]) });
          }
        } else if (userResponse.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
        
        setLoading(false);
        return;
      }
    }

    // ============================================
    // Opción 2: Si no pudimos decodificar, comparar por email del login
    // ============================================
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
      
      // Buscar el usuario que coincida con el email del login
      const user = loginEmail 
        ? users.find(u => u.email === loginEmail)
        : users[0]; // Fallback al primero si no hay email guardado
      
      if (user) {
        setUserId(user.id);
        
        setSettings((prev) => ({
          ...prev,
          name: user.name || '',
          surname: user.surname || '',
          email: user.email || '',
          age: user.age || '',
          sex: user.sex || '',
          weight: user.weight || '',
          height: user.height || '',
        }));

        if (user.sex) {
          setSelectedKeys({ sex: new Set([user.sex]) });
        }
      }
    } else if (userResponse.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  } catch (err) {
    console.error('Error loading user data:', err);
    setError('Error al cargar datos del usuario');
  } finally {
    setLoading(false);
  }
};

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  // ============================================
  // Guardar configuración
  // ============================================
  const handleSave = async () => {
  if (!userId) {
    setError('No se pudo identificar el usuario');
    return;
  }

  setSaving(true);
  setError('');

  try {
    const token = localStorage.getItem('token');

    // Preparar datos - solo incluir campos válidos
    const updateData = {
      name: settings.name,
      surname: settings.surname,
    };

    // Solo agregar campos opcionales si tienen valor
    if (settings.age && !isNaN(parseInt(settings.age))) {
      updateData.age = parseInt(settings.age);
    }

    if (settings.weight && !isNaN(parseInt(settings.weight))) {
      updateData.weight = parseInt(settings.weight);
    }

    if (settings.height && !isNaN(parseInt(settings.height))) {
      updateData.height = parseInt(settings.height);
    }

    if (settings.sex && (settings.sex === 'MALE' || settings.sex === 'FEMALE')) {
      updateData.sex = settings.sex;
    }

    console.log('Enviando datos:', updateData); // Para debug

    const userUpdateResponse = await fetch(`${BACKEND_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    // Leer la respuesta completa para ver el error
    const responseText = await userUpdateResponse.text();
    console.log('Respuesta del servidor:', responseText);

    if (!userUpdateResponse.ok) {
      throw new Error(`Error al actualizar perfil: ${responseText}`);
    }

    // Guardar preferencias en Data table
  /*  const settingsData = {
      dataType: 'user_settings',
      value: JSON.stringify({
        notifMediciones: settings.notifMediciones,
        notifMedicamentos: settings.notifMedicamentos,
        notifCitas: settings.notifCitas,
        notifAlertas: settings.notifAlertas,
        compartirDatos: settings.compartirDatos,
        backupAutomatico: settings.backupAutomatico,
      })
    }; 

    const settingsResponse = await fetch(`${BACKEND_URL}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settingsData)
    });

    if (!settingsResponse.ok) {
      const settingsError = await settingsResponse.text();
      console.log('Error en settings:', settingsError);
      throw new Error('Error al guardar configuración');
    }
*/
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  } catch (err) {
    console.error('Error completo:', err);
    setError(`Error: ${err.message}`);
  } finally {
    setSaving(false);
  }
};
     
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Cuenta eliminada exitosamente');
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        throw new Error('Error al eliminar cuenta');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Error al eliminar la cuenta');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando configuración...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'privacidad', label: 'Privacidad', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600 mb-8">Personaliza tu experiencia de seguimiento de salud</p>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight size={16} className="ml-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* PERFIL */}
              {activeTab === 'perfil' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                      <input
                        type="text"
                        value={settings.surname}
                        onChange={(e) => handleChange('surname', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={settings.email}
                          disabled  // ✅ No se puede editar
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">El email no se puede modificar</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                      <input
                        type="number"
                        value={settings.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                      <input
                        type="number"
                        value={settings.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Dropdown de sexo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="border border-gray-300 rounded-lg w-full text-left text-black justify-start"
                            variant="bordered"
                          >
                            {getSelectedValue('sex')}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Sexo"
                          selectionMode="single"
                          selectedKeys={selectedKeys.sex}
                          onSelectionChange={(keys) => {
                            setSelectedKeys({ sex: keys });
                            handleSelect('sex', keys);
                          }}
                          className="text-slate-200 bg-stone-950 rounded-xl p-2"
                        >
                          <DropdownItem key="MALE">Masculino</DropdownItem>
                          <DropdownItem key="FEMALE">Femenino</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICACIONES */}
              {activeTab === 'notificaciones' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Preferencias de Notificaciones
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'notifMediciones',
                        label: 'Recordatorios de mediciones',
                        desc: 'Recibe alertas para medir tu glucosa y presión',
                      },
                      {
                        key: 'notifMedicamentos',
                        label: 'Recordatorios de medicamentos',
                        desc: 'Te avisaremos cuando sea hora de tomar tu medicación',
                      },
                      {
                        key: 'notifCitas',
                        label: 'Recordatorios de citas médicas',
                        desc: 'No te pierdas ninguna consulta con tu médico',
                      },
                      {
                        key: 'notifAlertas',
                        label: 'Alertas de valores anormales',
                        desc: 'Te notificaremos si tus mediciones están fuera del rango',
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            handleChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRIVACIDAD */}
              {activeTab === 'privacidad' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Privacidad y Datos
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Compartir datos con médicos
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Permite que tus profesionales de salud accedan a tus registros
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleChange('compartirDatos', !settings.compartirDatos)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.compartirDatos ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.compartirDatos ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Backup automático
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Guarda automáticamente una copia de seguridad de tus datos
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleChange('backupAutomatico', !settings.backupAutomatico)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.backupAutomatico ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.backupAutomatico ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                      <h3 className="font-semibold text-amber-900 mb-2">
                        Gestión de datos
                      </h3>
                      <p className="text-sm text-amber-800 mb-4">
                        Exporta o elimina tus datos de forma permanente
                      </p>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-100 cursor-pointer transition-colors font-medium">
                          Exportar datos
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 cursor-pointer transition-colors font-medium"
                        >
                          Cerrar sesión
                        </button>
                        <button 
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors font-medium"
                        >
                          Eliminar cuenta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botón Guardar */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl disabled:opacity-50'
                }`}
              >
                <Save size={20} />
                {saving ? 'Guardando...' : saved ? 'Guardado ✓' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}