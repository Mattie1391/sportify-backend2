### 功能  
___
測試帳號密碼
```
帳號： user@gmail.com
密碼： Test1234
```
- [x] 登入  
- [x] 登出  
- [x] 進入學習中心  
- [x] 觀看課程列表  
- [x] 觀看教練列表  
- [x] 上課  
- [x] 訂閱與付款  
- [x] 給課程評價
___

### 畫面
___
![image](https://github.com/user-attachments/assets/6ec23518-9f6b-4dae-9fe4-c091410e2b54)
![image](https://github.com/user-attachments/assets/40ec7045-ce55-4bb4-89cc-9ce80da113db)
![image](https://github.com/user-attachments/assets/8fcc1a9c-eb84-4f8a-bf41-78c9414163df)
![image](https://github.com/user-attachments/assets/263a13b8-c77d-437c-b6b3-5df34603d76b)
![image](https://github.com/user-attachments/assets/85713c83-7f62-4573-9252-3d3a8ecdea0e)
![image](https://github.com/user-attachments/assets/071ed033-5e14-4235-a61e-92c48055c5dc)
![image](https://github.com/user-attachments/assets/6df9ffc8-7c2c-4b6f-8e60-0c47d8fb9f24)
___
### 安裝  
___
以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：16.15.0 以上...

### 取得專案
```
https://github.com/Mattie1391/sportify-backend2.git
```
### 移動到專案內
```
cd sportify-backend2
```
### 安裝套件
```
npm install
```
### 環境變數設定  
請在終端機輸入 cp .env.example .env 來複製 .env.example 檔案，並依據 .env 內容調整相關欄位。
### 運行專案
```
npm run dev
```
### 開啟專案
```
https://tteddhuang.github.io/sportify-plus/
```
### 環境變數說明
___
```
PORT= #定義應用程式運行的伺服器端口號
DB_HOST= #定義資料庫主機的地址，通常是伺服器的 IP 或域名。
DB_PORT= #定義資料庫服務的連接端口號。
DB_USERNAME= #定義資料庫服務的連接端口號。
DB_PASSWORD= #定義連接資料庫所需的密碼。
DB_NAME= #定義應用程式使用的資料庫名稱。
JWT_EXPIRES_DAY= #定義 JSON Web Token (JWT) 的有效期限。
JWT_TEMPORARY_EXPIRES_DAY= #定義臨時 JSON Web Token (如重設密碼的 Token) 的有效期限。
JWT_SECRET= #定義用於加密和驗證 JWT 的密鑰。
GMAIL_USER_NAME= #定義應用程式使用的 Gmail 帳戶名稱，通常用於發送電子郵件
GMAIL_APP_PASSWORD= #定義 Gmail 帳戶的應用程式密碼，用於安全地發送電子郵件。
DB_SYNCHRONIZE= #定義是否自動同步資料庫的表結構。
```
### 資料夾說明
___
* bin - 存放應用程式的啟動腳本或執行相關的腳本檔案
* config - 存放應用程式的配置檔案，例如環境變數、數據庫連接設定或其他全域設定
* controllers - 負責定義應用程式的業務邏輯
* db - 存放與資料庫相關的檔案
* entities - 存放應用程式的資料模型或實體定義
* middlewares - 存放中介軟體（Middleware）功能的檔案
* node_modules - 由 npm（Node.js 套件管理器）自動生成的資料夾，用來存放專案所依賴的所有第三方模組和庫
* public - 存放靜態資源
* routes - 存放應用程式的路由定義檔案
* services - 定義應用程式的服務邏輯
* utils - 用於存放工具函數或公用模組
* views - 存放應用程式的視圖檔案，通常用於處理伺服器端渲染的模板檔案
