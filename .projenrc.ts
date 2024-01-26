import { awscdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jayson Rawlins',
  description: 'CDK Aspect to tag resources with git metadata.  This provides a nice connection between the construct and the git repository.',
  authorAddress: 'jayson.rawlins@layerborn.io',
  cdkVersion: '2.30.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: '@layerborn/cdk-git-tagger',
  npmAccess: NpmAccess.PUBLIC,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/layerborn/cdk-git-tagger-aspect.git',
  githubOptions: {
    mergify: true,
    pullRequestLint: true,
  },
  depsUpgrade: true,
  publishToPypi: {
    distName: 'layerborn.cdk-git-tagger',
    module: 'layerborn.cdk_git_tagger',
  },
  publishToGo: {
    moduleName: 'github.com/layerborn/cdk-git-tagger-go',
  },
  devDeps: ['@types/mock-fs', 'mock-fs'],
});

project.synth();
