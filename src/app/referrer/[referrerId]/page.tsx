"use client";
import React from 'react'

export default function page({ 
    params,
 }: {
    params: { referrerId: string };
}) {
  return (
    <div><h1>Details about Referrer {params.referrerId}</h1></div>
  )
}
