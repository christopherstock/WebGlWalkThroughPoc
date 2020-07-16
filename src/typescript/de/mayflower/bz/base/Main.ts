
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Remove static context!
    *******************************************************************************************************************/
    export class Main
    {
        /** The application title. */
        public      static  readonly    TITLE                   :string                     = 'webGL Walk Through, PoC, (c) 2020 Mayflower GmbH';

        /** The singleton instance of the game. */
        public      static              game                    :bz.App                    = null;

        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            document.title = bz.Main.TITLE;
            Main.acclaim();

            Main.game = new bz.App();
            Main.game.start();
        }

        /** ************************************************************************************************************
        *   Logs the specified message to the output console.
        *
        *   @param msg The message to log.
        ***************************************************************************************************************/
        public static log( msg:any = '' ) : void
        {
            // tslint:disable-next-line:no-console
            console.log( msg );
        }

        /** ************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            Main.log( Main.TITLE  );
            Main.log();
        }
    }
