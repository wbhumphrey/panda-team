class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def permission_denied
    {plain: 'unauthorized', status: :unauthorized, layout: false}
  end

  def access_token
    session['user'] && session['user']['access_token']
  end
end
