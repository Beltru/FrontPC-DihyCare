'use client';
import React, { useState } from 'react';
import {
  Bell,
  User,
  Shield,
  Save,
  ChevronRight
} from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Perfil
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '541112345678', // ✅ formato correcto sin signos ni espacios
    fechaNacimiento: '1985-05-15',

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
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Guardando configuración:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
                          placeholder="Joe"
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
                          placeholder="joe@example.com"
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
                        <button className="px-4 py-2 bg-white border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-100 transition-colors font-medium">
                          Exportar datos
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
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
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <Save size={20} />
                {saved ? 'Guardado ✓' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
