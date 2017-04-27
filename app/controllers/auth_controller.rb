require 'httparty'

class AuthController < ApplicationController
  def authenticate
    uri = URI.parse(params['canvas_host'])
    render 'Invalid Domain' unless uri.scheme && uri.host

    auth_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: 'code',
      redirect_uri: auth_success_url,
      state: ''
    }

    auth_uri = URI::Generic.build({
      scheme: uri.scheme,
      host: uri.host,
      path: '/login/oauth2/auth',
      query: auth_params.to_query
    })

    redirect_to auth_uri.to_s
  end

  def success
    referer = URI(request.referer)

    token_params = {
      grant_type: 'authorization_code',
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET'],
      redirect_uri: auth_success_url,
      code: params['code']
    }

    token_uri = URI::Generic.build({
      scheme: referer.scheme,
      host: referer.host,
      path: "/login/oauth2/token",
      query: token_params.to_query
    })

    response = HTTParty.post(token_uri.to_s)

    render text: response.body
  end
end
