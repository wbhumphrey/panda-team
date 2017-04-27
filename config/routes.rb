Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'health_check' => 'health_check#show'

  get 'teams/register'
  get 'teams/register_class'
  get 'teams' => 'teams#index'

  get 'calendar/index'

  get 'auth' => 'auth#authenticate'
  get 'auth/success'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
