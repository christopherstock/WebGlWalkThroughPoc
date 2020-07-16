
    import * as chai from 'chai';
    import * as bz   from '../../../../../typescript/de/mayflower/bz';

    describe( 'MathUtil', () :void =>
    {
        it( 'gets the sinus from 90 degrees', () :void =>
        {
            const result:string = bz.Main.TITLE;
            chai.expect( result ).to.equal( 1.0 );
        });
    });
