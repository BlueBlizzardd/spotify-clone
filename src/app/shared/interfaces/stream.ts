export type Stream = {
    playing: boolean;
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
}