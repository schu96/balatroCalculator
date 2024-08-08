'use client';
// Currently an empty page to test things later
import JokerCard from '@/components/jokersTest';
import { jokerData } from '@/components/jokerData';
import React, {useState} from 'react';
import FMLayout from './fmLayout';

export default function JokerTesting () {
  const [jokerPage, setJokerPage] = useState(1);

  return (
    <FMLayout>
      <title>Joker Testing Grounds</title>
      <div>
        <JokerCard></JokerCard>
      </div>
    </FMLayout>
  )
}