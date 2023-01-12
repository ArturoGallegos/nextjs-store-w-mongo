module.exports = {
  parserPreset: {
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'REFERENCE', 'Reference', 'REFERENCES', 'References'],
      // issuePrefixes: ['References #[FIK-']
    },
  },
  rules: {
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['Build', 'Chore', 'Ci', 'Docs', 'Feat', 'Fix', 'Hotfix', 'Perf', 'Refactor', 'Revert', 'Style', 'Test', 'Release']],
    'header-max-length': [2, 'always', 50],
    'body-leading-blank': [2, 'always'],
    'subject-case': [2, 'always', 'sentence-case'],
    'body-case': [2, 'always', 'sentence-case'],
    'body-max-line-length': [2, 'always', 72],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 'Infinity'],
    // 'references-empty': [2, 'never'],
  },
};
