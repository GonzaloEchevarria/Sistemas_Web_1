
const list = document.getElementById("publicaciones");
	const titulo= document.createElement('h3');
	const br= document.createElement('br');
	const cuerpo= document.createElement('p');
	const comentar= document.createElement('span');
	const a= document.createElement('a');
	list.appendChild(titulo);
	list.appendChild(br);
	list.appendChild(br);
	list.appendChild(br);
	list.appendChild(br);
	list.appendChild(cuerpo);
	comentar.appendChild(a);
	list.appendChild(comentar);
	titulo.innerHTML='PRUEBA 2';
	cuerpo.innerHTML=publicaciones1.innerHTML;

	

	