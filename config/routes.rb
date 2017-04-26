Rails.application.routes.draw do
  get 'health_check' => 'health_check#show'

  get 'teams/register'
  get 'teams/register_class'

  get 'users/authenticate'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
