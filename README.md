# Task Manager Application - Classmethod Coding Challenge

Đây là ứng dụng web quản lý công việc được xây dựng bằng React theo yêu cầu của thử thách lập trình Classmethod. Ứng dụng cho phép người dùng thêm, sửa, xóa, đánh dấu hoàn thành và lọc các công việc hàng ngày.

## Tính năng chính

* Thêm công việc mới.
* Đánh dấu công việc là hoàn thành hoặc chưa hoàn thành.
* Chỉnh sửa tên công việc.
* Xóa một hoặc nhiều công việc đã chọn.
* Lọc công việc theo trạng thái: Tất cả, Đã hoàn thành, Đang chờ.
* Chọn/Bỏ chọn nhiều công việc để thực hiện hành động hàng loạt (Xóa).
* Lưu trữ dữ liệu công việc vào Local Storage của trình duyệt.
* Giao diện đáp ứng (Responsive).

## Công nghệ sử dụng

* **React:** Thư viện JavaScript để xây dựng giao diện người dùng.
* **Vite:** Công cụ build frontend thế hệ mới.
* **React Bootstrap:** Thư viện component UI dựa trên Bootstrap.
* **Bootstrap:** Framework CSS phổ biến.
* **Font Awesome (React):** Thư viện icon SVG.
* **React Context:** Quản lý state toàn cục cho danh sách công việc.
* **JavaScript (ES6+):** Ngôn ngữ lập trình chính.
* **CSS:** Tùy chỉnh giao diện (nếu có, ví dụ: `App.css`).
* **LocalStorage:** Lưu trữ dữ liệu phía trình duyệt.

## Hướng dẫn cài đặt và chạy ứng dụng

**Yêu cầu:**

* **Node.js:** Phiên bản `v20.19.0` trở lên (Dựa trên thông tin bạn cung cấp).
* **npm:** Phiên bản `10.8.2` trở lên (Thường đi kèm với Node.js).

**Các bước:**

1.  **Clone kho lưu trữ (hoặc tải mã nguồn):**
    ```bash
    git clone [https://github.com/YourUsername/task-manager-app.git](https://github.com/YourUsername/task-manager-app.git) # Thay bằng URL kho lưu trữ của bạn
    cd task-manager-app
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```bash
    npm install
    ```

3.  **Chạy ứng dụng ở chế độ phát triển:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập vào địa chỉ được cung cấp (thường là `http://localhost:5173/`).

4.  **Build ứng dụng cho production (tùy chọn):**
    ```bash
    npm run build
    ```

## Ghi chú bổ sung

* Ứng dụng sử dụng React Context (`src/contexts/TaskContext.jsx`) để quản lý state công việc và các hành động liên quan.
* Dữ liệu được lưu vào Local Storage với khóa `react-task-manager-tasks`.
* Giao diện được xây dựng chủ yếu bằng React Bootstrap và Font Awesome cho các icon.
* Đã triển khai các tính năng bổ sung như chọn/xóa nhiều mục và hành động theo ngữ cảnh dựa trên lựa chọn.

