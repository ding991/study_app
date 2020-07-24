package com.study_app;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
// import cn.rongcloud.imlib.react.RCIMLibPackage;
// import com.oblador.vectoricons.VectorIconsPackage;
// import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
//-阿里云推送开始
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.graphics.Color;
import android.os.Build;
// import org.wonday.aliyun.push.AliyunPushPackage;
import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.alibaba.sdk.android.push.huawei.HuaWeiRegister;
import com.alibaba.sdk.android.push.register.MiPushRegister;
import com.alibaba.sdk.android.push.register.GcmRegister;
//-阿里云推送结束

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add(new VectorIconsPackage());
          // packages.add(new RCIMLibPackage());
          // packages.add(new AliyunPushPackage());
          // packages.add(new RNNotificationsPackage(MainApplication.this));
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    this.initCloudChannel(this);
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.study_app.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }



    /**
  初始化阿里云推送通道
  @param applicationContext
  */
  private void initCloudChannel(final Context applicationContext) {
    // 创建notificaiton channel
    this.createNotificationChannel();
    PushServiceFactory.init(applicationContext);
    CloudPushService pushService = PushServiceFactory.getCloudPushService();
    // pushService.setNotificationSmallIcon(R.mipmap.ic_launcher_s);//设置通知栏小图标， 需要自行添加
    pushService.register(applicationContext, "30806801", "eb76965b742b3dcb9577522e75c1e2ff", new CommonCallback() {
      @Override
      public void onSuccess(String responnse) {
        // success
      }
      @Override
      public void onFailed(String code, String message) {
        // failed
      }
    });

    // 关于第三方推送通道的设置，请仔细阅读阿里云文档
    // https://help.aliyun.com/document_detail/30067.html?spm=a2c4g.11186623.6.589.598b7fa8vf9qWF

    // 注册方法会自动判断是否支持小米系统推送，如不支持会跳过注册。
    MiPushRegister.register(applicationContext, "小米AppID", "小米AppKey");

    // 注册方法会自动判断是否支持华为系统推送，如不支持会跳过注册。
    HuaWeiRegister.register(this);

    // 接入FCM/GCM初始化推送
    GcmRegister.register(applicationContext, "send_id", "application_id"); 

    // OPPO通道注册
    // OppoRegister.register(applicationContext, appKey, appSecret); // appKey/appSecret在OPPO通道开发者平台获取

    // 魅族通道注册
    // MeizuRegister.register(applicationContext, "appId", "appkey"); // appId/appkey在魅族开发者平台获取

    // VIVO通道注册
    // VivoRegister.register(applicationContext);
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
      // 通知渠道的id
      String id = "1";
      // 用户可以看到的通知渠道的名字.
      CharSequence name = "notification channel";
      // 用户可以看到的通知渠道的描述
      String description = "notification description";
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel mChannel = new NotificationChannel(id, name, importance);
      // 配置通知渠道的属性
      mChannel.setDescription(description);
      // 设置通知出现时的闪灯（如果 android 设备支持的话
      mChannel.enableLights(true);
      mChannel.setLightColor(Color.RED);
      // 设置通知出现时的震动（如果 android 设备支持的话
      mChannel.enableVibration(true);
      mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
      //最后在notificationmanager中创建该通知渠道
      mNotificationManager.createNotificationChannel(mChannel);
    }
  } // 添加结束
}
