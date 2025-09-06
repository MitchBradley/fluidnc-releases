        function restart() {window.open('/restart')}
        function sub(obj) {
            var fileName = obj.value.split('\\');
            document.getElementById('file-input').innerHTML = '   ' + fileName[fileName.length-1];
        }

        // Add event listener for form submission
        document.getElementById('upload_form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var form = document.getElementById('upload_form');
            var data = new FormData(form);
            
            // Create XMLHttpRequest
            var xhr = new XMLHttpRequest();
            
            // Set up progress tracking
            xhr.upload.addEventListener('progress', function(evt) {
                if (evt.lengthComputable) {
                    var per = evt.loaded / evt.total;
                    document.getElementById('prg').innerHTML = 'progress: ' + Math.round(per * 100) + '%';
                    document.getElementById('bar').style.width = Math.round(per * 100) + '%';
                }
            }, false);
            
            // Set up success handler
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('success!');
                    // Handle successful response here
                } else {
                    console.log('Error: ' + xhr.status);
                    // Handle error here
                }
            };
            
            // Set up error handler
            xhr.onerror = function() {
                console.log('Network error occurred');
                // Handle network error here
            };
            
            // Send the request
            xhr.open('POST', '/update');
            xhr.send(data);
        });
