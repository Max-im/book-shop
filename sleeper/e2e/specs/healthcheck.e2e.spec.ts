import { ping } from 'tcp-ping';

describe('Healthcheck', () => {
    it('Reservation', async () => {
        const response = await fetch('http://reservation:3000');
        expect(response.ok).toBeTruthy();
    });

    it('Auth', async () => {
        const response = await fetch('http://auth:3001');
        expect(response.ok).toBeTruthy();
    });

    it('Payments', (done) => {
        ping({ address: 'payments', port: 3003 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });

    it('Notification', (done) => {
        ping({ address: 'notification', port: 3004 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });
});
