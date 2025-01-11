import React from "react";
import "./timeline.css";

const Timeline: React.FC = () => {
  return (
    <div style={{
        margin: "25px 25px 25px 25px",
    }}>
        <div style={{
            fontSize:"25px",
            textAlign:"center",
            fontWeight:"bold",
            marginTop:"60px",
        }}>
            DFast Innovation Project Timeline
        </div>
        <div className="timeline">
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>08.08.2024</b></ul>
            <h3><b>Proof of Concept</b></h3>
            <p>ได้ข้อสรุปโครงการ แนวทางการดำเนินงาน แผนโครสร้างรายได้ และตั้งทีมทำงาน</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>09.09.2024</b></ul>
            <h3><b>Kickoff</b></h3>
            <p>ฤกษ์งามยามดี เริ่มดำเนินงาน</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>10.10.2024</b></ul>
            <h3><b>Backend System</b></h3>
            <p>ระบบหลังบ้าน การต่อสายงาน แผนโครงสร้างรายได้ และ การเชื่อมต่อแบบออโต้รัน</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>11.11.2024</b></ul>
            <h3><b>DFast Token and 3K NFT</b></h3>
            <p>กำเนิด DFast Token และ 3K NFT สำหรับการใช้งาน Premium Member</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>31.12.2024</b></ul>
            <h3><b>3K SocialApp v.1.1</b></h3>
            <p>กำเนิดต้นแบบ Application ก๊อกๆๆ เพื่อให้หน้าตา และ การใช้งานเบื้องต้น</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>15.01.2025</b></ul>
            <h3><b>18K Meeting</b></h3>
            <p>ประชุมนัดแรก 18 ขุนพล ผู้นำทัพ เผยแผ่โครงการดีๆ สู่สาธารณะ โดยเน้นการสร้างเครือข่ายสายงานอันทรงประสิทธิภาพ</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <ul><b>20.02.2025</b></ul>
            <h3><b>3K SocialApp v.1.2</b></h3>
            <p>3K Application ก๊อกๆๆ ที่สามารถใช้งานได้ ใกล้เคียงเวอร์ชั่นสมบูรณ์มากยิ่งขึ้น</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            {/* <ul><b>20.02.2025</b></ul> */}
            <h3><b>To be continue ... ยังมีต่อ โปรดรอติดตาม</b></h3>
            {/* <p>3K Application ก๊อกๆๆ ที่สามารถใช้งานได้ ใกล้เคียงเวอร์ชั่นสมบูรณ์มากยิ่งขึ้น</p> */}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Timeline;
