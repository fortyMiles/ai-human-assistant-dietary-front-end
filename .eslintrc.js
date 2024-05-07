module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [{
		'env': {
			'node': true
		},
		'files': [
			'.eslintrc.{js,cjs}'
		],
		'parserOptions': {
			'sourceType': 'script'
		}
	}],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		//'@typescript-eslint',
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-undef': 'off',
		'no-unused-vars': 'off'
	}
};