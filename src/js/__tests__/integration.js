import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
        execSync('mkdir testoutput');
        execSync('git init', { cwd : 'testoutput' });
        execSync('git config user.email "you@example.com"', { cwd: 'testoutput' });
        execSync('git config user.name "Your Namer"', { cwd: 'testoutput' });
        execSync('git commit --allow-empty -m "Empty commit."', { cwd: 'testoutput' });
    });

    it('## should print help options', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/log.min.js -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run log commands', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/log.min.js -d src/test/fixture/design.json -o testoutput').toString();
        output = output.replace(/info: Loaded generator .*log.min.js.*/, '');
        expect(output).toMatchSnapshot();
        output = execSync('npm install', { cwd: 'testoutput' }).toString();
        output = execSync('npm run lint', { cwd: 'testoutput' }).toString();
        output = execSync('npm run build', { cwd: 'testoutput' }).toString();
    });
});
