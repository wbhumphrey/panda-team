Rails.application.routes.draw do
  get 'health_check' => 'health_check#show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
