export const jwtConstants = {
  secret: 'asdflkjk23asjdlf33423jksdf',
};

export const jwtOptions = {
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '3600s' },
};
