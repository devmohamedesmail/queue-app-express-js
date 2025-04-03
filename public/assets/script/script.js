let table = new DataTable('#myTable', {
    // options
});

// 
let image = document.getElementById('image');
image.addEventListener('change', function () {
   
    let reader = new FileReader();
    reader.onload = function (e) {
        let preview = document.getElementById('preview')
        preview.style.width = '100px';
        preview.style.height = '100px';
        preview.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});



// Toggle Sidebar
let toggle_btn = document.getElementById('toggle_btn');
let sidebar = document.getElementById('sidebar');


toggle_btn.addEventListener('click', function () {
    sidebar.classList.toggle('w-52');
    sidebar.classList.add('z-50');
    
});