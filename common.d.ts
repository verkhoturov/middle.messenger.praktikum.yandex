declare module '*.scss' {
    const styles: Record<string, string>;
    export default styles;
}

declare module 'bundle-text:*' {
    const content: string;
    export default content;
}