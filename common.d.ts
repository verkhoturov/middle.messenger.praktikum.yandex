declare module '*.scss' {
    const styles: Record<string, string>;
    export default styles;
}

declare module '*.hbs' {
    const templateFunction: (param?: any) => string;
    export default templateFunction;
}