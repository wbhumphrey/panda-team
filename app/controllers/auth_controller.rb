require 'httparty'

class AuthController < ApplicationController
  def authenticate
    uri = URI.parse(params['canvas_host'])
    render 'Invalid Domain' unless uri.scheme && uri.host

    auth_uri = URI::Generic.build({
      scheme: uri.scheme,
      host: uri.host,
    })

    state_payload = { canvas_host: auth_uri.to_s }
    JWT.encode(state_payload, jwt_secret , 'HS256')

    auth_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: 'code',
      redirect_uri: auth_success_url,
      state: JWT.encode(state_payload, jwt_secret , 'HS256')
    }

    auth_uri.path = '/login/oauth2/auth'
    auth_uri.query = auth_params.to_query

    redirect_to auth_uri.to_s
  end

  def success
    decoded_token = JWT.decode(params[:state], jwt_secret, true, { :algorithm => 'HS256' })

    token_uri = URI(decoded_token.first['canvas_host'])

    token_params = {
      grant_type: 'authorization_code',
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET'],
      redirect_uri: auth_success_url,
      code: params['code']
    }

    token_uri.path = "/login/oauth2/token"
    token_uri.query = token_params.to_query

    response = HTTParty.post(token_uri.to_s)

    response = JSON.parse(response.body)

    auth_success = false
    if response['access_token']
      session[:user] = { access_token: response['access_token'] }
      auth_success = true
    end

    render locals: { auth_success: auth_success }
  end

  private

  def jwt_secret
    ENV['JWT_SECRET'] || (raise 'No JWT secret configured')
  end
end
