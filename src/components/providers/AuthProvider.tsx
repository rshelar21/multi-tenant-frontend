'use client';
import React, { useEffect, useState } from 'react';
import { createUser, selectedUser } from '@/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMeAPI } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from '../common';

const PUBLIC_ROUTES = ['/sign-up', '/sign-in'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAppSelector(selectedUser);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = !isPublicRoute;

  const { data, status, refetch, isSuccess, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getMeAPI,
    enabled: !user.loginStatus,
    retry: false,
  });

  // 1. If user is not logged in and on a protected route, validate session
  useEffect(() => {
    if (!user.loginStatus && isProtectedRoute) {
      refetch();
    } else if (!user.loginStatus && isPublicRoute) {
      setShowLoader(false); // allow access to public routes
    }
  }, [user.loginStatus, isPublicRoute, isProtectedRoute, refetch]);

  // 2. On successful validation, store user
  useEffect(() => {
    if (isSuccess && data && !user.loginStatus) {
      dispatch(
        createUser({
          accessToken: data?.accessToken,
          email: data?.user?.email,
          id: data?.user?.id,
          name: data?.user?.name,
          username: data?.user?.username,
          loginStatus: true,
          roles: data?.user?.roles,
          tenant: data?.user?.tenant,
        })
      );
      setShowLoader(false); // show app content
    }
  }, [isSuccess, data, dispatch, user.loginStatus]);

  // 3. If validation fails on protected route, redirect to sign-up
  useEffect(() => {
    if (isError && isProtectedRoute && !user.loginStatus) {
      // if (value) {
      //   router.push(`${value}`);
      // } else {
      // }
      router.replace('/sign-in');
    }
  }, [isError, isProtectedRoute, user.loginStatus, router]);

  // 4. If logged-in user visits public route, redirect to home
  useEffect(() => {
    if (user.loginStatus && isPublicRoute) {
      setShowLoader(true);
      router.push('/');
    }
    if (user.loginStatus && !isPublicRoute) {
      setShowLoader(false);
      router.push('/');
    }
  }, [user.loginStatus, isPublicRoute, router]);

  // 5. Show loader while checking auth or redirecting
  if (
    showLoader ||
    (!user.loginStatus && isProtectedRoute && status === 'pending')
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthProvider;
