const express = require("express");
const router = express.Router();

const basePostController = require("../../app/controllers/base/PostController");

router.post("/nha-hang", basePostController.nha_hang);
router.post("/nguoi-dung", basePostController.nguoi_dung);
router.post("/dang-ky", basePostController.dang_ky);
router.post("/dang-nhap", basePostController.dang_nhap);
router.post("/", basePostController.index);
router.post("/mon-an", basePostController.mon_an);
router.post("/dat-hang/:_id", basePostController.don_dat_hang);

module.exports = router;

/*
 <script>
        google.maps.event.addDomListener(window, 'load', function () {
            // Thiết lập bản đồ với tùy chọn ban đầu
            var options = {
                zoom: 7,  // Mức độ zoom
                center: new google.maps.LatLng(11.489512818046325, 106.82573642426048),  // Tọa độ trung tâm của bản đồ
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // Khởi tạo bản đồ và gán nó vào phần tử HTML với ID là 'map'
            var map = new google.maps.Map(document.getElementById('map'), options);

            // Hàm thêm các điểm đánh dấu lên bản đồ
            function addMarker(data) {
                // Kiểm tra nếu kinh độ và vĩ độ hợp lệ
                var vido = parseFloat(data.vi_do);
                var kinhdo = parseFloat(data.kinh_do);
                if (isNaN(vido) || isNaN(kinhdo)) {
                    console.error("Tọa độ không hợp lệ cho nhà hàng:", data.name);
                    return;
                }

                // Tạo vị trí của điểm đánh dấu
                var position = new google.maps.LatLng(vido, kinhdo);

                // Tạo điểm đánh dấu và thêm nó lên bản đồ
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: data.name
                });
                marker.addListener('click', function () {
                    fetch('http://localhost:3001/json-nha-hang/' + data._id)
                        .then(response => response.json())
                        .then(chi_tiet_nha_hang => {
                            console.log(chi_tiet_nha_hang);
                            fetch('http://localhost:3001/json-don-dat-hang/' + chi_tiet_nha_hang._id)
                                .then(response => response.json())
                                .then(don_dat_hang => {
                                    console.log(don_dat_hang);
                                    let content = `
                                        <div class="modal fade" id="modal-show-marker"
                                            tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                                <div class="modal-content" style="border-radius: 10px;">
                                                <div class="card-group " style="border-radius: 10px 10px 0 0;">
                                                        <div class="card card-box">
                                                            <img class="card-img-top" style="width: 100%; height:500px;" src="/images/${data.anh}" alt="" />
                                                            <div class="card-body">
                                                                <h5 class="card-title "> ${data.ten} </h5> <hr>
                                                                <p class="card-text">
                                                                    ${chi_tiet_nha_hang._id}
                                                                </p>
                                                                <p class="card-text">
                                                                    <small class="text-muted"> ${data.dia_chi} </small>
                                                                </p>
                                                            </div>
                                                        
                                                            <a href="/dat-hang/${data._id}" type="button" class="btn btn-success btn-lg btn-block" >
                                                                Đặt Hàng
                                                            </a>
                                                            <a href="" id="xem-chi-tiet-ahihi" data-toggle="modal" data-target="#modal-xem-chi-tiet-all" type="button" class="btn btn-success btn-lg btn-block" >
                                                                Xem Chi Tiết 
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;

                                    if (Array.isArray(don_dat_hang) && don_dat_hang.length > 0) {
                                        // Sử dụng `.map()` để tạo ra nội dung cho từng đơn đặt hàng
                                        let mon_an_html = don_dat_hang.map(dh => `
                                            <p>Món ăn: ${dh.mon_an}</p>
                                            <p>Khách hàng: ${dh.khach_hang}</p>
                                            <p>Giá: ${dh.gia}</p>
                                            <p>Thời gian đặt: ${dh.ngay_dat_hang}</p>
                                            <p> Trạng thái: ${dh.trang_thai} </p>
                                            <hr>
                                        `).join('');

                                        // Tạo nội dung cho modal hiển thị chi tiết các món ăn
                                        let xem_chi_tiet = `
                                            <div class="modal fade" id="modal-xem-chi-tiet-all" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-lg modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h4 class="modal-title w-100 text-center alert alert-info" id="myLargeModalLabel">
                                                                Chi tiết các đơn đặt hàng của nhà hàng ${data.ten}.
                                                            </h4>
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                        </div>
                                                        <div class="modal-body" style="max-height: 500px; overflow-y: auto;">
                                                            ${mon_an_html} <!-- Nội dung các đơn đặt hàng -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                        $('#modal-container').html(content);
                                        $('#modal-show-marker').modal('show');
                                        $('#xem-chi-tiet-ahihi').click(() => {
                                             $('#modal-show-marker').modal('hide');
                                        })
                                        $('#modal-xem-chi-tiet').html(xem_chi_tiet);

                                    } else {
                                        console.error('Không có đơn đặt hàng nào để hiển thị.');
                                    }

                                })
                                .catch(error => console.error('Error:', error));
                        })
                        .catch(error => console.error('Error:', error));
                });

            }

            google.maps.event.addListener(map, 'click', function (event) {
                var clickedLocation = event.latLng;
                var latitude = clickedLocation.lat();
                var longitude = clickedLocation.lng();

                document.getElementById('vido-view').value = latitude;
                document.getElementById('kinhdo-view').value = longitude;

                $('#modal-show-add-marker').modal('show');
                // console.log(latitude, longitude) 
            });

            // Hàm lấy dữ liệu JSON từ API và hiển thị các điểm đánh dấu
            function loadMarkersFromAPI() {
                fetch('http://localhost:3001/json-nha-hang')
                    .then(response => response.json())  // Chuyển đổi phản hồi thành định dạng JSON
                    .then(data => {
                        console.log("Dữ liệu từ API:", data);  // Kiểm tra dữ liệu trả về

                        data.forEach(item => {
                            addMarker(item);
                        });
                    })
                    .catch(error => console.error('Lỗi khi lấy dữ liệu từ API:', error));
            }

            loadMarkersFromAPI();
        });
    </script>
*/