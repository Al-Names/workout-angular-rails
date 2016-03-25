class WorkoutsController < ApplicationController

  def index
    respond_with Workout.all 
  end

  def create 
    respond_with Workout.create(workout_params)
  end

  def show
    respond_with Workout.find(params[:id])
  end

  def destroy
    respond_with Workout.find(params[:id]).destroy
  end

  private 

  def workout_params
    params.require(:workout).permit(:title)
  end



end ## class end
