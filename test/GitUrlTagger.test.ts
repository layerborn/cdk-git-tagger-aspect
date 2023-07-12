import { Aspects, Stack } from 'aws-cdk-lib';
import { Capture, Template } from 'aws-cdk-lib/assertions';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { GitUrlTagger } from '../src/GitUrlTagger';

describe('Aspect adds tags as expected', () => {
  test('with defaults', () => {
    const stack = new Stack();
    new Topic(stack, 'MyTopic', {});

    Aspects.of(stack).add(new GitUrlTagger());

    const assert = Template.fromStack(stack);
    const urlCapture = new Capture();
    assert.hasResourceProperties('AWS::SNS::Topic', {
      Tags: [{
        Key: 'GitUrl',
        Value: urlCapture, // git@github.com:Defiance-Digital/cdk-git-tagger.git
      }],
    });

    const regexSSH = /^git@github\.com:[A-Za-z0-9-]+\/[A-Za-z0-9-]+\.git$/;
    const regexHTTPS = /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+\.git$/;
    const matchesSSH = regexSSH.test(urlCapture.asString());
    const matchesHTTPS = regexHTTPS.test(urlCapture.asString());
    console.log('SSH: ' + regexSSH.test(urlCapture.asString()));
    console.log('SSH: ' + regexHTTPS.test(urlCapture.asString()));
    expect(matchesSSH || matchesHTTPS).toBeTruthy();
  });


  test('with overridden tag name', () => {
    const stack = new Stack();
    new Topic(stack, 'MyTopic', {});

    Aspects.of(stack).add(new GitUrlTagger({ tagName: 'MyTagName' }));

    const assert = Template.fromStack(stack);
    const urlCapture = new Capture();
    assert.hasResourceProperties('AWS::SNS::Topic', {
      Tags: [{
        Key: 'MyTagName',
        Value: urlCapture, // git@github.com:Defiance-Digital/cdk-git-tagger.git
      }],
    });

    const regexSSH = /^git@github\.com:[A-Za-z0-9-]+\/[A-Za-z0-9-]+\.git$/;
    const regexHTTPS = /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+\.git$/;
    const matchesSSH = regexSSH.test(urlCapture.asString());
    const matchesHTTPS = regexHTTPS.test(urlCapture.asString());
    console.log('SSH: ' + regexSSH.test(urlCapture.asString()));
    console.log('SSH: ' + regexHTTPS.test(urlCapture.asString()));
    expect(matchesSSH || matchesHTTPS).toBeTruthy();
  });

});
