export const prepUrl = (url: string): string => {
    const urlStartHttp = url.substr(0, 7);
    const urlStartHttps = url.substr(0, 8);

    if(urlStartHttp !== "http://" && urlStartHttps !== "https://")
        return `http://${url}`;

    return url;
};