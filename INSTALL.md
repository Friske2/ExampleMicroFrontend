# คำแนะนำการติดตั้ง

## แก้ไขปัญหา npm cache permission

หากเจอ error เกี่ยวกับ npm cache permission ให้รันคำสั่งนี้ก่อน:

```bash
sudo chown -R $(whoami) ~/.npm
```

หรือใช้วิธีอื่นโดยไม่ต้องใช้ sudo:

```bash
npm install --cache .npm-cache
```

## ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Main App

```bash
cd main-app
npm install
```

### 2. ติดตั้ง Sub App

```bash
cd sub-app
npm install
```

หรือถ้ามีปัญหา permission:

```bash
cd sub-app
npm install --cache .npm-cache
```

### 3. รันแอปพลิเคชัน

เปิด terminal 2 หน้าต่าง:

**Terminal 1:**
```bash
cd main-app
npm run dev
```

**Terminal 2:**
```bash
cd sub-app
npm run dev
```

### 4. เปิดเบราว์เซอร์

ไปที่ http://localhost:3000

## Dependencies ที่ต้องติดตั้ง

### Main App
- vue@^3.4.0
- qiankun@^2.10.16
- @vitejs/plugin-vue@^5.0.0
- vite@^5.0.0

### Sub App
- vue@^3.4.0
- qiankun@^2.10.16
- @vitejs/plugin-vue@^5.0.0
- vite@^5.0.0
- vite-plugin-qiankun@^1.0.15
