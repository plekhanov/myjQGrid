function getDate() {
	var date = new Date();
	return '/Date(' + date.getTime() + ')/'  
}
function getData() {
	return [
		{
			fname: 'Philip',
			lname: 'Plekhanov', 
			phone: '847-858-4542',
			updateDate: getDate()
		},
		{
			fname: 'Margarita',
			lname: 'Kuznetsova', 
			phone: '312-555-1212',
			updateDate: getDate()
		},
		{
			fname: 'Sam',
			lname: 'Nolan', 
			phone: '847-858-4542',
			updateDate: getDate()
		},
		{
			fname: 'Marth',
			lname: 'Morgan', 
			phone: '312-555-1212',
			updateDate: getDate()
		},		
		{
			fname: 'Mark',
			lname: 'Newman', 
			phone: '847-858-4542',
			updateDate: getDate()
		},
		{
			fname: 'Rick',
			lname: 'Strongman', 
			phone: '312-555-1212',
			updateDate: getDate()
		},
		{
			fname: 'Lary',
			lname: 'Noname', 
			phone: '847-858-4542',
			updateDate: getDate()
		},
		{
			fname: 'Lary',
			lname: 'Pulam', 
			phone: '847-858-4542',
			updateDate: getDate()
		},
		{
			fname: 'Rorger',
			lname: 'Hilt', 
			phone: '312-555-1212',
			updateDate: getDate()
		}
	];
}
function getModel() {
	return [
		{
			key: '',
			dataIndex: 'fname',
			formatter: {},
			title: 'First Name',
			id: '',
		},
		{
			key: '',
			dataIndex: 'lname',
			formatter: {},
			title: 'Last Name',
			id: ''
		},
		{
			key: '',
			width: 100,
			dataIndex: 'phone',
			formatter: {},
			title: 'Phone',
			id: ''
		},
		{
			key: '',
			date: true,
			dataIndex: 'updateDate',
			formatter: {},
			title: 'Update Date',
			id: ''
		}
	];
}

function init() {
	$('.grid').simpleGrid('init', {
		data: getData(),
		colModel: getModel(),
		pageSize: 5
	});
}

$(document).ready(function () {init()});