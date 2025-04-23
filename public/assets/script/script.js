



document.addEventListener('DOMContentLoaded', function () {



    let table = new DataTable('#myTable', {
        // options
    });
    
    



    let image = document.getElementById('image');
    if (image) {
        image.addEventListener('change', function () {
            let reader = new FileReader();
            reader.onload = function (e) {
                let preview = document.getElementById('preview');
                preview.style.width = '100px';
                preview.style.height = '100px';
                preview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        });
    }
});

