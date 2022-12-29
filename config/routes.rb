Rails.application.routes.draw do
  post 'api/test', to: 'application#test'
end
