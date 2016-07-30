export const PATH = {
	tools: "tools",
	src: "src",
	typings: "typings",
	build: "dist",
	assets: "dist/assets",
	tasks: "tools/gulp-tasks",
	docs: "docs",
	baseUrl: "http://staging.fourstarpizza.ie/"
};

export const INJECT = {
	htmlSrc: `${PATH.src}/index.html`,
};


export const COPY = {
	src: [
		`${PATH.src}/**`,
		`!${INJECT.htmlSrc}` ,
		`!${PATH.src}/**/*.php`,
		`!${PATH.src}/**/*.psd`,
		`!${PATH.src}/**/*.ai`
	],
	dest: PATH.build
};



export const GENERATORS = {
	wp_monk: {
		pattern: "__comp",
		src_dir: `${PATH.tools}/generators`,
		dest_dir: `${PATH.src}/components`
	}
};



var newName = process.argv[1];
var genName = process.argv[2];

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});
