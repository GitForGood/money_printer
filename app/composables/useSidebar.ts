export const useSidebar = () => {
    const isOpen = useState<boolean>('sidebar_isOpen', () => false)
    const view = useState<any>('sidebar_view', () => null)
    const title = useState<string>('sidebar_title', () => '')
    // Store props/data that might be needed by the dynamic component
    const data = useState<Record<string, any>>('sidebar_data', () => ({}))

    /**
     * Open the sidebar with a specific component and title
     * @param component The Vue component to render (markRaw recommended if passing component definition directly)
     * @param titleText The title to display in the header
     * @param propsData Optional data object to pass to the component
     */
    function open(component: any, titleText: string = '', propsData: Record<string, any> = {}) {
        view.value = component
        title.value = titleText
        data.value = propsData
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    function toggle() {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen,
        view,
        title, // Exposing title
        data,
        open,
        close,
        toggle
    }
}
