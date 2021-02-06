/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }

}
declare var window: any

declare var cancelAnimationFrame: (timerId: number) => any
declare var requestAnimationFrame: (fm: any) => any

declare interface HTMLElement { }
declare var HTMLElement: {
  prototype: HTMLElement
  new(): HTMLElement
}

declare interface Window { }