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

  // Estados base
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState(null);

  // Configuración del usuario
  const [settings, setSettings] = useState({
    nombre: '',
    surname: '',
    email: '',
    weight: '',
    sex: '',
    height: '',

    notifMediciones: true,
    notifMedicamentos: true,
    notifCitas: true,
    notifAlertas: true,

    recordatorioMedicion: '08:00',
    frecuenciaMedicion: 'diaria',

    compartirDatos: false,
    backupAutomatico: true,
  });

  const [activeTab, setActiveTab] = useState('perfil');

  // ✅ Estado de selección corregido
  const [selectedKeys, setSelectedKeys] = useState({
    sex: new Set([]),
  });

  // ============================================
  // Función: obtener texto seleccionado del dropdown
  // ============================================
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
  // Cargar datos de usuario al iniciar
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
          const user = users[0];
          setUserId(user.id);
          setSettings((prev) => ({
            ...prev,
            nombre: user.name,
            surname: user.surname,
            email: user.email,
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

  // ============================================
  // Actualizar campos locales
  // ============================================
  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  // ============================================
  // Guardar configuración en backend
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

      const userUpdateResponse = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: settings.nombre,
          surname: settings.surname,
          email: settings.email,
        })
      });

      if (!userUpdateResponse.ok) throw new Error('Error al actualizar perfil');

      const settingsData = {
        dataType: 'user_settings',
        value: JSON.stringify({
          weight: settings.weight,
          height: settings.height,
          sex: settings.sex,
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

      if (!settingsResponse.ok) throw new Error('Error al guardar configuración');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Error al guardar la configuración. Por favor intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // Logout y eliminación de cuenta
  // ============================================
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
                        value={settings.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
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
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
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

                    {/* ✅ Dropdown de sexo corregido */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="border border-gray-300 rounded-lg w-full text-left"
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
                          <DropdownItem key="Masculino">Masculino</DropdownItem>
                          <DropdownItem key="Femenino">Femenino</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICACIONES y PRIVACIDAD quedan igual */}
              {/* (omitidos aquí por extensión, pero no requieren cambios) */}
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
