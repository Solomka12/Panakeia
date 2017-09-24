const smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
const settings = {
	filename: "_smartgrid",
	outputStyle: 'sass', /* less || scss || sass || styl */
	oldSizeStyle: false,
	columns: 12, /* number of grid columns */
	offset: "30px", /* gutter width px || % */
	container: {
		maxWidth: '1170px', /* max-width оn very large screen. 1140px in bootstrap 4*/ 
		fields: '30px' /* side fields */
	},
	breakPoints: {

		// bootstrap 3----------------
		lg: {
			'width': '1200px', /* -> @media (max-width: 1200px) */
			'fields': '30px' /* side fields */
		},
		md: {
			'width': '992px',
			'fields': '15px'
		},
		sm: {
			'width': '768px',
			'fields': '15px'
		},
		xs: {
			'width': '560px',
			'fields': '15px'
		}
		//---------------------------
		/*
		// bootstrap 4----------------
		xl: {
			'width': '1200px',
			'fields': '30px'
		},
		lg: {
			'width': '992px',
			'fields': '15px'
		},
		md: {
			'width': '768px',
			'fields': '15px'
		},
		sm: {
			'width': '576px',
			'fields': '15px'
		},
		xs: {
			'width': '320px',
			'fields': '15px'
		}
		//---------------------------
		*/
		/* 
		We can create any quantity of break points.

		some_name: {
				some_width: 'Npx',
				some_offset: 'N(px|%)'
		}
		*/
	}
};

smartgrid('./src/style', settings);