'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  User,
  Shield,
  Save,
  ChevronRight
} from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

export default function SettingsPage() {
  const router = useRouter();
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  
  // User ID (we'll get this from the token or user info)
  const [userId, setUserId] = useState(null);
  
  const [settings, setSettings] = useState({
    // Perfil
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',

    // Unidades de medida
    unidadGlucosa: 'mg/dL',
    unidadPresion: 'mmHg',
    unidadPeso: 'kg',

    // Rangos objetivo - Glucosa
    glucosaMinima: 70,
    glucosaMaxima: 180,
    glucosaAyunas: 100,

    // Rangos objetivo - Presión
    presionSistolicaMax: 130,
    presionDiastolicaMax: 80,

    // Notificaciones
    notifMediciones: true,
    notifMedicamentos: true,
    notifCitas: true,
    notifAlertas: true,

    // Recordatorios
    recordatorioMedicion: '08:00',
    frecuenciaMedicion: 'diaria',

    // Privacidad
    compartirDatos: false,
    backupAutomatico: true,
  });

  const [activeTab, setActiveTab] = useState('perfil');

  // ============================================
  // STEP 1: Load user data when page opens
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

      // Fetch user info
      const userResponse = await fetch(`${BACKEND_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (userResponse.ok) {
        const users = await userResponse.json();
        if (users.length > 0) {
          const user = users[0]; // Get first user (ideally, identify logged-in user)
          setUserId(user.id);
          
          // Update settings with user data
          setSettings(prev => ({
            ...prev,
            nombre: user.name + ' ' + user.surname,
            email: user.email,
            // Add more fields as your User model has them
          }));
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
  // STEP 2: Save settings to backend
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

      // Update user profile (name, email, etc.)
      const [firstName, ...lastNameParts] = settings.nombre.split(' ');
      const lastName = lastNameParts.join(' ');

      const userUpdateResponse = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          email: settings.email,
          // Add other user fields as needed
        })
      });

      if (!userUpdateResponse.ok) {
        throw new Error('Error al actualizar perfil');
      }

      // Save other settings as data (like preferences)
      const settingsData = {
        dataType: 'user_settings',
        value: JSON.stringify({
          unidadGlucosa: settings.unidadGlucosa,
          unidadPresion: settings.unidadPresion,
          unidadPeso: settings.unidadPeso,
          glucosaMinima: settings.glucosaMinima,
          glucosaMaxima: settings.glucosaMaxima,
          glucosaAyunas: settings.glucosaAyunas,
          presionSistolicaMax: settings.presionSistolicaMax,
          presionDiastolicaMax: settings.presionDiastolicaMax,
          notifMediciones: settings.notifMediciones,
          notifMedicamentos: settings.notifMedicamentos,
          notifCitas: settings.notifCitas,
          notifAlertas: settings.notifAlertas,
          recordatorioMedicion: settings.recordatorioMedicion,
          frecuenciaMedicion: settings.frecuenciaMedicion,
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

      if (settingsResponse.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        throw new Error('Error al guardar configuración');
      }

    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Error al guardar la configuración. Por favor intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // STEP 3: Handle logout
  // ============================================
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // ============================================
  // STEP 4: Handle account deletion
  // ============================================
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración
          </h1>
          <p className="text-gray-600">
            Personaliza tu experiencia de seguimiento de salud
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con tabs */}
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
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Información Personal
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nombre */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          placeholder="Juan Pérez"
                          value={settings.nombre}
                          onChange={(e) =>
                            handleChange('nombre', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="juan@example.com"
                          value={settings.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <PhoneInput
                          country="ar"
                          value={settings.telefono}
                          onChange={(phone) => handleChange('telefono', phone)}
                          inputClass="!w-full !text-gray-900 !text-base !rounded-lg !py-2.5 !pl-12 !border !border-gray-300 !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent"
                          containerClass="!w-full"
                          buttonClass="!border-gray-300 !bg-gray-50 !rounded-l-lg hover:!bg-gray-100"
                          dropdownClass="!rounded-lg !shadow-lg !border-gray-200"
                          enableSearch
                          searchPlaceholder="Buscar país"
                        />
                      </div>

                      {/* Fecha de nacimiento */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de nacimiento
                        </label>
                        <input
                          type="date"
                          value={settings.fechaNacimiento}
                          onChange={(e) =>
                            handleChange('fechaNacimiento', e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
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
                          <h3 className="font-semibold text-gray-900">
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[item.key]
                              ? 'bg-blue-600'
                              : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[item.key]
                                ? 'translate-x-6'
                                : 'translate-x-1'
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
                    {/* Compartir datos */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Compartir datos con médicos
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Permite que tus profesionales de salud accedan a tus
                          registros
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleChange('compartirDatos', !settings.compartirDatos)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.compartirDatos
                            ? 'bg-blue-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.compartirDatos
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Backup automático */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Backup automático
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Guarda automáticamente una copia de seguridad de tus
                          datos
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleChange('backupAutomatico', !settings.backupAutomatico)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.backupAutomatico
                            ? 'bg-blue-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.backupAutomatico
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Exportar / Eliminar */}
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

            {/* Botón guardar */}
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