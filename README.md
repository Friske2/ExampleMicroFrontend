# Micro Frontend Project with Vue.js + Qiankun

โปรเจกต์ตัวอย่าง Micro Frontend ที่ใช้ Vue.js และ Qiankun แบบเรียบง่าย

## โครงสร้างโปรเจกต์

```
microFrontend/
├── main-app/          # Main Container App (Port 3000)
│   ├── src/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── vite.config.js
│
└── sub-app/           # Sub Application (Port 3001)
    ├── src/
    │   ├── App.vue
    │   └── main.js
    ├── package.json
    └── vite.config.js
```

## การติดตั้งและรัน

### 1. ติดตั้ง dependencies สำหรับ Main App

```bash
cd main-app
npm install
```

### 2. ติดตั้ง dependencies สำหรับ Sub App

```bash
cd sub-app
npm install
```

### 3. รันแอปพลิเคชัน

เปิด terminal 2 หน้าต่าง:

**Terminal 1 - รัน Main App:**
```bash
cd main-app
npm run dev
```
Main App จะรันที่ http://localhost:3000

**Terminal 2 - รัน Sub App:**
```bash
cd sub-app
npm run dev
```
Sub App จะรันที่ http://localhost:3001

### 4. ทดสอบ

1. เปิดเบราว์เซอร์ไปที่ http://localhost:3000
2. คลิกที่ "Sub App" ใน navigation
3. จะเห็น Micro Frontend ถูกโหลดเข้ามา

## คุณสมบัติ

- ✅ Vue 3 Composition API
- ✅ Qiankun Framework สำหรับ Micro Frontend
- ✅ Vite สำหรับการพัฒนา
- ✅ แยกการพัฒนาและ deploy ได้อิสระ
- ✅ Style Isolation
- ✅ Simple และเข้าใจง่าย

## การทำงาน

1. **Main App** เป็น Container ที่ทำหน้าที่:
   - ลงทะเบียน Micro Frontend Apps
   - จัดการ routing
   - โหลด Sub Apps เมื่อต้องการ

2. **Sub App** เป็น Micro Frontend ที่:
   - พัฒนาได้อิสระ
   - มี lifecycle functions (bootstrap, mount, unmount)
   - สามารถรัน standalone หรือถูกโหลดโดย Main App

## สิ่งที่ควรรู้

- Main App และ Sub App ต้องรันพร้อมกันใน development
- Sub App ต้อง expose lifecycle functions (bootstrap, mount, unmount)
- Qiankun จะจัดการ sandbox และ style isolation ให้อัตโนมัติ

## Build สำหรับ Production

### Main App
```bash
cd main-app
npm run build
```

### Sub App
```bash
cd sub-app
npm run build
```

หลังจาก build แล้ว ต้อง deploy Sub App และอัพเดท `entry` URL ใน Main App ให้ชี้ไปที่ production URL
