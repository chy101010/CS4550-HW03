server {
	listen 80;
	listen [::]:80;
	
	root /home/ning/www/CS4550-HW03/build;

	index index.html;

	server_name hw03.citronk.com;
	
	location / {
		try_files $uri $uri/ =404;
	}
}
