class SessionController < ApplicationController
	before_filter :check_user, :except => [:create, :destroy]

	def new
	end

	def create
		user = User.authenticate(params[:email], params[:password])
		if !user.nil?
			session[:user] = {
				id: user.id,
				nombre: user.nombre,
				apellido: user.apellido,
				usuario: user.usuario,
				mail: user.mail,
				wikipage: user.wikipage,
				admin: user.admin,
				status: user.status
			}
			redirect_to root_url, :notice => "Logged in!"
		else
			redirect_to root_url, :notice => "Invalid email or password!"
		end
	end

	def destroy
		session[:user] = nil
		redirect_to root_url, :notice => "Logged out!"
	end

end
