export default [
    {
        files: ["src/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                __dirname: "readonly",
                console: "readonly",
                exports: "writable",
                module: "readonly",
                process: "readonly",
                require: "readonly",
            },
        },
        rules: {
            curly: "warn",
            eqeqeq: "warn",
            "no-throw-literal": "warn",
            semi: "warn",
        },
    },
];
