import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
    <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">                
        <p>This is a restricted area</p>
        <p>ท่านไม่สามารถใช้งานพื้นที่นี้ได้</p>
        <div className="flex flex-col items-center">
            <a 
                className="flex flex-col mt-8 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors hover:border-zinc-800"
                href="/">
                Home / กลับหน้าหลัก
            </a>
        </div>
    </div>
    </main>
  )
}
