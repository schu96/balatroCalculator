import '../app/globals.css';
import React from 'react';
import FloatingMenu from '../components/floatingComponent';

export default function FMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FloatingMenu />
      {children}
    </>
  )
}
