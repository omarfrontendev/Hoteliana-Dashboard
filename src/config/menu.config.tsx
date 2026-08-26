import {
    UsersIcon,
    LayoutDashboard,
    Key,
    Users2,
} from 'lucide-react';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import SuperAdminLayout from '@/layout/SuperAdminLayout';
import type { ReactNode } from 'react';
import { ProtectedAuth } from '@/app/router/ProtectedAuth';
import { Navigate } from 'react-router-dom';
import CreateDashboardUser from '@/pages/dashboard/dashboard-users/CreateDashboardUser';
import UpdateDashboardUser from '@/pages/dashboard/dashboard-users/UpdateDashboardUser';
import DashboardUsersView from '@/pages/dashboard/dashboard-users/DashboardUsersView';
import ViewPermissions from '@/pages/dashboard/permissions/VeiwPermissions';
import CreatePermissions from '@/pages/dashboard/permissions/CreatePermissions';
import UpdatePermissions from '@/pages/dashboard/permissions/UpdatePermissions';
import { FirstLoginScreen } from '@/pages/auth/FirstLoginScreen';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ForgetPasswordPage } from '@/pages/auth/ForgetPasswordPage';
import CreateSupplierPage from '@/pages/dashboard/suppliers/CreateSupplierPage';
import SuppliersView from '@/pages/dashboard/suppliers/SuppliersView';
import UpdateSupplierPage from '@/pages/dashboard/suppliers/UpdateSuplierPage';
import AgentsView from '@/pages/dashboard/Agents/AgentsView';
import UpdateAgentPage from '@/pages/dashboard/Agents/UpdateAgentPage';
import CreateAgentPage from '@/pages/dashboard/Agents/CreateAgentPage';
import { ChangePasswordPage } from '@/pages/auth/ChangePasswordPage copy';

interface HiddenRoute {
    path: string;
    element: ReactNode;
    layout?: 'superAdmin' | 'none';
}

interface ModuleItem {
    id?: string;
    icon: any;
    label: string;
    path?: string;
    badge?: string | null;
    element?: ReactNode; // 💡 Component to render in router
    children?: ModuleItem[];
}

interface ModuleSection {
    section: string;
    items: ModuleItem[];
}

// 💡 Central sidebar + routes config
export const modules: ModuleSection[] = [
    {
        section: 'sidebar.main',
        items: [
            {
                id: "users",
                icon: UsersIcon,
                label: "sidebar.hrModule",
                children: [
                    {
                        icon: LayoutDashboard,
                        label: 'sidebar.dashboardUsers',
                        path: '/dashboard-users',
                        element: <DashboardUsersView />,
                    },
                    {
                        icon: Key,
                        label: 'sidebar.profilePermissions',
                        path: '/roles',
                        element: <ViewPermissions />,
                    },
                    {
                        icon: Users2,
                        label: 'Suppliers',
                        path: '/suppliers',
                        element: <SuppliersView />,
                    },
                    {
                        icon: Users2,
                        label: 'Agents',
                        path: '/agents',
                        element: <AgentsView />,
                    },
                ]
            },
        ],
    },
];


export const hiddenRoutes: HiddenRoute[] = [
    {
        path: '/dashboard-users/create',
        element: <CreateDashboardUser />,
    },
    {
        path: '/dashboard-users/:id/edit',
        element: <UpdateDashboardUser />,
    },
    {
        path: '/agents/create',
        element: <CreateAgentPage />,
    },
    {
        path: '/agents/:id/edit',
        element: <UpdateAgentPage />,
    },
    {
        path: '/suppliers/create',
        element: <CreateSupplierPage />,
    },
    {
        path: '/suppliers/:id/edit',
        element: <UpdateSupplierPage />,
    },
    {
        path: '/roles/create',
        element: <CreatePermissions />,
    },
    {
        path: '/roles/:id/edit',
        element: <UpdatePermissions />,
    },

];

const flattenRoutes = (items: any[]): any[] => {
    return items.flatMap((item) => {
        if (item.children) {
            return flattenRoutes(item.children);
        }

        if (!item.path) return [];

        return {
            path: item.path,
            element: (
                <ProtectedRoute>
                    <SuperAdminLayout>
                        {item.element}
                    </SuperAdminLayout>
                </ProtectedRoute>
            ),
        };
    });
};

// 💡 Flat routes array for router
export const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Navigate to="/dashboard-users" replace />
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth/login',
        element:
            <ProtectedAuth>
                <LoginPage />
            </ProtectedAuth>,
    },
    {
        path: '/auth/forget-password',
        element:
            <ProtectedAuth>
                <ForgetPasswordPage />
            </ProtectedAuth>,
    },
    {
        path: '/auth/new-password',
        element:
            <ProtectedAuth>
                <ChangePasswordPage />
            </ProtectedAuth>,
    },
    {
        path: '/auth/first-login',
        element:
            <ProtectedAuth>
                <FirstLoginScreen />
            </ProtectedAuth>,
    },
    ...modules.flatMap((section) =>

        flattenRoutes(section.items)
    ),
    ...hiddenRoutes.map((route) => ({
        path: route.path,
        element: (
            <ProtectedRoute>
                <SuperAdminLayout>
                    {route.element}
                </SuperAdminLayout>
            </ProtectedRoute>
        ),
    })),
];
