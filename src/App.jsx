import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ServerConfiguration from './pages/ServerConfiguration/ServerConfiguration';
import FirmwarePackages from './pages/FirmwareCatalog/FirmwarePackages';
import ModelsApprovals from './pages/ModelsApprovals/ModelsApprovals';
import OperationsRollouts from './pages/OperationsRollouts/OperationsRollouts';
import PlanningDevices from './pages/PlanningDevices/PlanningDevices';
import AdminDiagnostics from './pages/AdminDiagnostics/AdminDiagnostics';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/server-configuration" replace />} />
      <Route
        path="/server-configuration"
        element={
          <Layout>
            <ServerConfiguration />
          </Layout>
        }
      />
      <Route
        path="/firmware-catalog"
        element={
          <Layout>
            <FirmwarePackages />
          </Layout>
        }
      />
      <Route
        path="/models-approvals"
        element={
          <Layout>
            <ModelsApprovals />
          </Layout>
        }
      />
      <Route
        path="/operations-rollouts"
        element={
          <Layout>
            <OperationsRollouts />
          </Layout>
        }
      />
      <Route
        path="/planning-devices"
        element={
          <Layout>
            <PlanningDevices />
          </Layout>
        }
      />
      <Route
        path="/admin-diagnostics"
        element={
          <Layout>
            <AdminDiagnostics />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/server-configuration" replace />} />
    </Routes>
  );
}


