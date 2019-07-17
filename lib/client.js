import Raven from "raven-js";
import RavenLoggerBase from "./main";

export default class RavenLoggerClient extends RavenLoggerBase {
    constructor({ publicDSN, shouldCatchConsoleError, trackUser = false }, ravenOptions) {
        super({ shouldCatchConsoleError });

        if (!publicDSN) return;

        Raven.config(publicDSN, { environment: "client", ...ravenOptions }).install();
        this.raven = Raven;
        this.trackUser = trackUser;
    }

    setTagsContext(tags) {
        this.raven.setTagsContext(tags);
    }
}
